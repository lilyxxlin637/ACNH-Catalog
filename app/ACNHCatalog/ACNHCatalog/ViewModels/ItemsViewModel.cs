using ACNHCatalog.Models;
using ACNHCatalog.Views;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Reflection;
using Xamarin.Forms;

namespace ACNHCatalog.ViewModels
{
    public class ItemsViewModel : BaseViewModel
    {
        public ObservableCollection<Item> Items { get; set; }
        public Command LoadItemsCommand { get; set; }

        public ItemsViewModel(dynamic json, IDictionary<string, ISet<string>> ownedDict, string title, string key)
        {
            var assembly = typeof(ItemsViewModel).GetTypeInfo().Assembly;
            Title = title;
            var items = new List<Item>();
            var values = json[0]["Value"];
            var properties = typeof(Item).GetProperties();
            foreach (JObject value in values)
            {
                var jp = value.Properties().Select(e => e.Name).ToArray();
                var item = new Item(ownedDict, key);
                item.OwnedStatusChanged += Item_OwnedStatusChanged;

                foreach (var p in properties)
                {
                    if (jp.Contains(p.Name))
                    {
                        p.SetValue(item, value[p.Name].ToString());
                    }
                }
                //if (jp.Contains("IconFilename"))
                //{
                //    var filename = value["IconFilename"].ToString();
                //    item.IconFilename = filename + ".png";
                //}
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
}