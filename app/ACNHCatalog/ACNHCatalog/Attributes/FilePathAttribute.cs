using System;

namespace ACNHCatalog.Attributes
{
    public class FilePathAttribute : Attribute
    {
        public FilePathAttribute(string path)
        {
            Path = path;
        }

        public string Path { get; }
    }
}
