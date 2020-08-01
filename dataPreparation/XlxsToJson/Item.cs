using System.Collections.Generic;

namespace XlxsToJson
{
    public class Item : ItemVariation
    {
        public string Name { get; set; }
        public string EnglishName { get; set; }
        public List<ItemVariation> Variations { get; set; }
        public string DIY { get; set; }
        public string Buy { get; set; }
        public string Sell { get; set; }
        public string HHABasePoints { get; set; }
        public string Size { get; set; }
        public string MilesPrice { get; set; }
        public string Source { get; set; }
        public string SourceNotes { get; set; }
        public string SeasonalAvailability { get; set; }
        public string MannequinPiece { get; set; }
        public string StyleLabel { get; set; }
        public string PatternCustomize { get; set; }
        public string BodyCustomize { get; set; }
        public string Themes { get; set; }
        public string SortOrder { get; set; }
        public string VillagerEquippable { get; set; }
        public string Catalog { get; set; }
        public string Filename { get; set; }
        public string ClothGroup { get; set; }
        public string InternalID { get; set; }
        public string UniqueEntryID { get; set; }
        public string IconFilename { get; set; }
        public string CritterpediaFilename { get; set; }
        public string FurnitureFilename { get; set; }
        public string RealArtworkTitle { get; set; }
        public string Description { get; set; }
        public string Tag { get; set; }

    }
}
