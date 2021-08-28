using Core.Users;
using Dal.Repositories.RefreshTokens;
using Dal.UnitOfWork;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Services.Authentication.Google;
using Services.User;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Services.Authentication
{
  public interface IAuthenticationService
  {
    Task<AuthenticationResponse> Authenticate(AuthenticationRequest request);

    Task<AuthenticationResponse> AuthenticateGoogleUser(GoogleRequest request);

    Task<AuthenticationResponse> Refresh(RefreshTokenRequest request);
  }
  public class AuthenticationService : IAuthenticationService
  {
    private readonly JwtSecurityTokenHandler _jwtSecurityTokenHandler;
    private readonly IRefreshTokenRepository _refreshTokenRepository;
    private readonly IRefreshTokenService _refreshTokenService;
    private readonly IJwtTokenService _jwtTokenService;
    private readonly UserManager<AplicationUser> _userManager;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IUserService _userService;

    public AuthenticationService(JwtSecurityTokenHandler jwtSecurityTokenHandler, IRefreshTokenRepository refreshTokenRepository, IRefreshTokenService refreshTokenService, IJwtTokenService jwtTokenService, UserManager<AplicationUser> userManager, IUnitOfWork unitOfWork, IUserService userService)
    {
      _jwtSecurityTokenHandler = jwtSecurityTokenHandler;
      _refreshTokenRepository = refreshTokenRepository;
      _refreshTokenService = refreshTokenService;
      _jwtTokenService = jwtTokenService;
      _userManager = userManager;
      _unitOfWork = unitOfWork;
      _userService = userService;
    }

    public async Task<AuthenticationResponse> Authenticate(AuthenticationRequest request)
    {
      var user = await _userManager.FindByEmailAsync(request.Email);
      if (user == null)
      {
        return new AuthenticationResponse(AuthenticationErrorType.IsUserNotFound);
      }

      var isPasswordValid = await _userManager.CheckPasswordAsync(user, request.Password);
      if (!isPasswordValid)
      {
        return new AuthenticationResponse(AuthenticationErrorType.IsWrongPassword);
      }

      var token = _jwtTokenService.GenerateJwtToken(user);
      var refreshToken = _refreshTokenService.GenerateRefreshToken(user.Id, token.Id);

      _refreshTokenRepository.Add(refreshToken);
      await _unitOfWork.SaveChangesAsync();

      return new AuthenticationResponse
      {
        JwtToken = _jwtSecurityTokenHandler.WriteToken(token),
        RefreshToken = refreshToken.Token
      };
    }

    public async Task<AuthenticationResponse> AuthenticateGoogleUser(GoogleRequest request)
    {
      var payload = GoogleJsonWebSignature.ValidateAsync(request.TokenId, new GoogleJsonWebSignature.ValidationSettings()).Result;

      var user = await _userManager.FindByEmailAsync(payload.Email);

      if(user == null)
      {
        user = await _userService.CreateGoogleUser(payload);
      }

      var token = _jwtTokenService.GetGoogleSecurityToken(user, payload);
      var refreshToken = _refreshTokenService.GenerateRefreshToken(user.Id, token.Id);

      _refreshTokenRepository.Add(refreshToken);
      await _unitOfWork.SaveChangesAsync();

      return new AuthenticationResponse
      {
        JwtToken = _jwtSecurityTokenHandler.WriteToken(token),
        RefreshToken = refreshToken.Token
      };

    }

    public async Task<AuthenticationResponse> Refresh(RefreshTokenRequest request)
    {
      #region JwtToken Validation

      var jwtClaimsPrincipal = _jwtTokenService.GetClaimsPrincipal(request.JwtToken);
      if (jwtClaimsPrincipal == null)
        return new AuthenticationResponse(AuthenticationErrorType.IsTokenInvalid);

      var isJwtNotExpired = _jwtTokenService.IsNotExpired(jwtClaimsPrincipal);
      if (isJwtNotExpired)
        return new AuthenticationResponse(AuthenticationErrorType.IsNotExpired);

      #endregion

      #region RefreshToken Validation

      var jwtId = jwtClaimsPrincipal.GetJwtId();
      var refreshToken = await _refreshTokenRepository.GetAsync(request.RefreshToken);

      var validationResult = _refreshTokenService.ValidateRefreshToken(refreshToken, jwtId);
      if (!validationResult.IsSuccess)
      {
        return new AuthenticationResponse(validationResult.AuthenticationErrorType);
      }

      refreshToken.IsUsed = true;
      _refreshTokenRepository.Update(refreshToken);

      #endregion

      #region Jwt and Refresh Tokens generation

      var userId = jwtClaimsPrincipal.GetUserId();
      var user = await _userManager.FindByIdAsync(userId);

      var newJwtToken = _jwtTokenService.GenerateJwtToken(user);
      var newRefreshToken = _refreshTokenService.GenerateRefreshToken(user.Id, newJwtToken.Id);

      _refreshTokenRepository.Add(newRefreshToken);
      await _unitOfWork.SaveChangesAsync();

      #endregion

      return new AuthenticationResponse
      {
        JwtToken = _jwtSecurityTokenHandler.WriteToken(newJwtToken),
        RefreshToken = newRefreshToken.Token
      };
    }
  }
}
