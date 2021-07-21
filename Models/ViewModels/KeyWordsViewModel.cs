using System;
using System.Collections.Generic;
using System.Text;

namespace Dal.ViewModels
{
    public class KeyWordsViewModel
    {
        public List<string> KeyWords { get; set; }
        public bool GenerateNegative { get; set; }
        public bool Exact { get; set; }
        public bool Phrace { get; set; }
        public bool Broad { get; set; }
        public bool Modifier { get; set; }
        public bool Skag { get; set; }
    }
}
