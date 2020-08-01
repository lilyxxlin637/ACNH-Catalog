using Newtonsoft.Json;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;

namespace XlxsToJson
{
    class Program
    {
        static void Main(string[] args)
        {
            ConvertToJson();
        }

        private static readonly string ExcelFilePath = @"RawData\items.xlsx";
        private static readonly string TranslationsFolder = "Translations";
        private static readonly string OutputFolder = @"..\..\..\..\..\app\ACNHCatalog\ACNHCatalog\Data";

        private static void ConvertToJson()
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (var package = new ExcelPackage(new FileInfo(ExcelFilePath)))
            {
                var excludedWorksheets = new string[] { "Other", "Achievements", "Construction", "Read Me" };
                var translationDict = GetTranslation();
                var itemProperties = typeof(Item).GetProperties();
                foreach (var sheet in package.Workbook.Worksheets)
                {
                    var sheetName = sheet.Name;
                    if (excludedWorksheets.Contains(sheetName))
                    {
                        continue;
                    }

                    var results = new Dictionary<string, List<Item>>();
                    var maxRow = sheet.Dimension.Rows;
                    var indexDict = CreateIndexDict(itemProperties, sheet);
                    for (var i = 2; i <= maxRow; i++)
                    {
                        var item = ConstructItem(itemProperties, sheet, indexDict, i);
                        var chinese = TranslateToChinese(translationDict, item);
                        AddToResults(sheetName, results, item, chinese);
                    }

                    var json = JsonConvert.SerializeObject(results.OrderBy(e => e.Key), Formatting.Indented, new JsonSerializerSettings()
                    {
                        NullValueHandling = NullValueHandling.Ignore
                    });
                    File.WriteAllText(OutputFolder + "\\" + sheetName + ".json", json);
                }
            }
        }

        private static void AddToResults(string sheetName, Dictionary<string, List<Item>> results, Item item, string chinese)
        {
            var variation = item.Clone<Item, ItemVariation>();
            if (results.TryGetValue(sheetName, out var list))
            {
                var f = list.FirstOrDefault(e => e.Name == chinese);
                if (f == null)
                {
                    AddItemToList(item, variation, list);
                }
                else
                {
                    f.Variations.Add(variation);
                }
            }
            else
            {
                list = new List<Item>();
                results[sheetName] = list;
                AddItemToList(item, variation, list);
            }
        }

        private static string TranslateToChinese(Dictionary<string, string> translationDict, Item item)
        {
            var chinese = "";
            if (translationDict.TryGetValue(item.Name, out var v))
            {
                chinese = v;
                item.EnglishName = item.Name;
                item.Name = chinese;
            }

            return chinese;
        }

        private static void AddItemToList(Item item, ItemVariation variation, List<Item> list)
        {
            if (HasVariation(item.Variation) || HasVariation(item.Pattern) || HasVariation(item.Genuine))
            {
                item.Variations = new List<ItemVariation>() { variation };
            }
            list.Add(item);
        }

        private static Item ConstructItem(PropertyInfo[] itemProperties, ExcelWorksheet sheet, Dictionary<string, int> indexDict, int j)
        {
            var item = new Item();
            foreach (var property in itemProperties)
            {
                if (indexDict.TryGetValue(property.Name, out var index))
                {
                    var value = sheet.Cells[j, index].Value?.ToString();
                    property.SetValue(item, value);
                }
            }

            return item;
        }

        private static Dictionary<string, int> CreateIndexDict(PropertyInfo[] itemProperties, ExcelWorksheet sheet)
        {
            var indexDict = new Dictionary<string, int>();
            var maxCol = sheet.Dimension.Columns;
            foreach (var property in itemProperties)
            {
                var index = FindIndex(sheet, maxCol, property.Name);
                if (index >= 0)
                {
                    indexDict[property.Name] = index;
                }
            }

            return indexDict;
        }

        private static bool HasVariation(string v)
        {
            return v != "NA" && !string.IsNullOrWhiteSpace(v);
        }

        private static int FindIndex(ExcelWorksheet sheet, int maxCol, string colName)
        {
            var index = -1;
            for (var i = 1; i < maxCol; i++)
            {
                var v = sheet.Cells[1, i].Value.ToString().Replace(" ", "").ToLower();
                if (v == colName.ToLower())
                {
                    index = i;
                }
            }

            return index;
        }

        private static Dictionary<string, string> GetTranslation()
        {
            var dict = new Dictionary<string, string>();
            var files = Directory.GetFiles(TranslationsFolder, "*.json");
            foreach (var file in files)
            {
                if (file.Contains("variants.json")
                    || file.Contains("patterns.json")
                    || file.Contains("catchphrases.json")
                    || file.Contains("villagers.json"))
                {
                    continue;
                }
                var json = File.ReadAllText(file);
                dynamic translated = JsonConvert.DeserializeObject(json);
                foreach (dynamic t in translated)
                {
                    var id = t["locale"]["USen"].Value.ToLower();
                    var zh = t["locale"]["CNzh"].Value;
                    if (dict.ContainsKey(id) && dict[id] != zh)
                    {
                        Console.WriteLine(id + ": " + zh + "(old: " + dict[id] + ")");
                    }
                    else
                    {
                        dict[id] = zh;
                    }
                }
            }

            return dict;
        }
    }
}
