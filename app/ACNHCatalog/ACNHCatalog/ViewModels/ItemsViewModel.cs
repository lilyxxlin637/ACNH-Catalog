using System;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Threading.Tasks;

using Xamarin.Forms;

using ACNHCatalog.Models;
using ACNHCatalog.Views;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using System.Linq;
using System.Reflection;
using ACNHCatalog.Services;

namespace ACNHCatalog.ViewModels
{
    public class ItemsViewModel : BaseViewModel
    {
        private readonly dynamic _json;

        public ObservableCollection<Item> Items { get; set; }
        public Command LoadItemsCommand { get; set; }
        
        private readonly string _key;

        private readonly IDictionary<string, ISet<string>> _ownedDict;

        public ItemsViewModel(dynamic json, IDictionary<string, ISet<string>> ownedDict, string title, string key)
        {
            _ownedDict = ownedDict;
            _key = key;
            var assembly = typeof(ItemsViewModel).GetTypeInfo().Assembly;
            _json = json;
            Title = title;
            var items = new List<Item>();
            var c = json[0]["Value"];
            var properties = typeof(Item).GetProperties();
            foreach(JObject c2 in c)
            {
                var jp = c2.Properties().Select(e => e.Name).ToArray();
                var item = new Item(ownedDict, key);
                item.OwnedStatusChanged += Item_OwnedStatusChanged;

                foreach(var p in properties)
                {
                    if(jp.Contains(p.Name))
                    {
                        p.SetValue(item, c2[p.Name].ToString());
                    }
                }
                if(jp.Contains("IconFilename"))
                {
                    var filename = c2["IconFilename"].ToString();
                    item.Icon = filename+".png";
                }
                items.Add(item);
            }
            Items = new ObservableCollection<Item>(items);
            LoadItemsCommand = new Command(() => { });

            MessagingCenter.Subscribe<NewItemPage, Item>(this, "AddItem", async (obj, item) =>
            {
                var newItem = item as Item;
                Items.Add(newItem);
                await DataStore.AddItemAsync(newItem);
            });

            
        }

        private void Item_OwnedStatusChanged(object sender, Item e)
        {
        }
    }

    public class InvertedBooleanConverter : IValueConverter
    {

        public object Convert(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            var b = (bool)value;
            return !b;
        }

        public object ConvertBack(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            return false;
        }
    }
}