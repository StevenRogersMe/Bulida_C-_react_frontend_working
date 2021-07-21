using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Widgets
{
    public class SnippetExtension
    {
        public int Id { get; set; }
        public int AdGroupId { get; set; }
        public string Language { get; set; }
        public string AdGroupName { get; set; }
        public string HeaderType { get; set; } // ???
        public List<string> SnippetValues { get; set; }

    }
}
