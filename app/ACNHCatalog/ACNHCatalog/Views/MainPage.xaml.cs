using ACNHCatalog.Attributes;
using ACNHCatalog.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace ACNHCatalog.Views
{
    // Learn more about making custom code visible in the Xamarin.Forms previewer
    // by visiting https://aka.ms/xamarinforms-previewer
    [DesignTimeVisible(false)]
    public partial class MainPage : MasterDetailPage
    {
        Dictionary<int, NavigationPage> MenuPages = new Dictionary<int, NavigationPage>();
        public MainPage()
        {
            InitializeComponent();

            MasterBehavior = MasterBehavior.Popover;

            var task = new Task(async () => await NavigateFromMenu(0));
            task.Start();
            task.Wait();
        }

        public async Task NavigateFromMenu(int id)
        {
            if (!MenuPages.ContainsKey(id))
            {
                var assembly = typeof(MainPage).GetTypeInfo().Assembly;
                switch (id)
                {
                    case (int)MenuItemType.Fish:
                        AddPage(id, assembly);
                        break;
                    case (int)MenuItemType.Insect:
                        AddPage(id, assembly);
                        break;
                    case (int)MenuItemType.Fossils:
                        AddPage(id, assembly);
                        break;
                    case (int)MenuItemType.About:
                        MenuPages.Add(id, new NavigationPage(new AboutPage()));
                        break;
                }
            }

            var newPage = MenuPages[id];

            if (newPage != null && Detail != newPage)
            {
                Detail = newPage;

                if (Device.RuntimePlatform == Device.Android)
                    await Task.Delay(100);

                IsPresented = false;
            }
        }

        private void AddPage(int id, Assembly assembly)
        {
            var type = (MenuItemType)id;
            var filePath = type.GetFilePath();
            Stream stream = assembly.GetManifestResourceStream("ACNHCatalog.Data."+ filePath + ".json");
            string text = "";
            using (var reader = new StreamReader(stream))
            {
                text = reader.ReadToEnd();
            }
            var json = JsonConvert.DeserializeObject(text);
            var name = type.GetDescription();

            MenuPages.Add(id, new NavigationPage(new ItemsPage(json, OwnedItems, name, filePath)));
        }

        private IDictionary<string, ISet<string>> _ownedItems;
        public IDictionary<string, ISet<string>> OwnedItems => _ownedItems ??= GetOwnedItems();

        private IDictionary<string, ISet<string>> GetOwnedItems()
        {
            string fileName = OwnedFilePath;
            if(File.Exists(fileName))
            {
                var json = File.ReadAllText(fileName);
                var obj = JsonConvert.DeserializeObject<IDictionary<string, ISet<string>>>(json);
                return obj;
            }
            return new Dictionary<string, ISet<string>>();
        }

        private static string _ownedFilePath;
        public static string OwnedFilePath => _ownedFilePath
            ??= Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "owned.txt");
    }

    public static class EnumExtensions
    {
        public static string GetDescription<T>(this T source)
        {
            FieldInfo fi = source.GetType().GetField(source.ToString());

            DescriptionAttribute[] attributes = (DescriptionAttribute[])fi.GetCustomAttributes(
                typeof(DescriptionAttribute), false);

            if (attributes != null && attributes.Length > 0) return attributes[0].Description;
            else return source.ToString();
        }
        public static string GetFilePath<T>(this T source)
        {
            FieldInfo fi = source.GetType().GetField(source.ToString());

            FilePathAttribute[] attributes = (FilePathAttribute[])fi.GetCustomAttributes(
                typeof(FilePathAttribute), false);

            if (attributes != null && attributes.Length > 0) return attributes[0].Path;
            else return source.ToString();
        }
    }
}