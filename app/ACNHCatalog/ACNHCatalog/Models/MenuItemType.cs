using ACNHCatalog.Attributes;
using System.ComponentModel;

namespace ACNHCatalog.Models
{
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
}
