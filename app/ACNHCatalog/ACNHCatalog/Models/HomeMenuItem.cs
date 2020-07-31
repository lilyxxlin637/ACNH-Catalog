using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace ACNHCatalog.Models
{
    public class FilePathAttribute : Attribute
    {
        public FilePathAttribute(string path)
        {
            Path = path;
        }

        public string Path { get; }
    }

    public enum MenuItemType
    {
        [Description("鱼类")]
        [FilePath("Fish")]
        Fish,
        [Description("虫类")]
        [FilePath("Insect")]
        Insect,
        [Description("化石")]
        [FilePath("Fossils")]
        Fossils,
        [Description("关于")]
        About
    }

    public class HomeMenuItem
    {
        public MenuItemType Id { get; set; }

        public string Title { get; set; }
    }
}
