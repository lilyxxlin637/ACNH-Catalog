using ACNHCatalog.Views;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms;

namespace ACNHCatalog.Models
{
    public class Item : MvvmCross.ViewModels.MvxViewModel
    {
        public Item(IDictionary<string, ISet<string>> dict, string key)
        {
            _ownedDict = dict;
            _key = key;
        }

        public string Name { get; set; }
        public string EnglishName { get; set; }
        public string Sell { get; set; }
        public string HHABasePoints { get; set; }
        public string Size { get; set; }

        private string _internalId;
        public string InternalID
        {
            get => _internalId; set
            {
                if (SetProperty(ref _internalId, value))
                {
                    if(_ownedDict.TryGetValue(_key, out var list))
                    {
                        NotOwned = !list.Contains(value);
                        OwnedStatus = "已拥有";
                    }
                }
            }
        }
        public string Description { get; set; }
        public string Color1 { get; set; }
        public string Color2 { get; set; }

        public string Icon { get; set; }

        private string _ownedSatus;
        public string OwnedStatus { get => _ownedSatus; set => SetProperty(ref _ownedSatus, value); }

        private bool _notOwned = true;
        public bool NotOwned { get => _notOwned; set => SetProperty(ref _notOwned, value); }

        private Command _ownedCommand;
        private readonly IDictionary<string, ISet<string>> _ownedDict;
        private readonly string _key;

        public Command OwnedCommand => _ownedCommand ??= new Command(async () => await ExecuteOwnCommand());
        public event EventHandler<Item> OwnedStatusChanged;

        async Task ExecuteOwnCommand()
        {
            if (NotOwned)
            {
                if (_ownedDict.TryGetValue(_key, out var list))
                {
                    list.Add(InternalID);
                }
                else
                {
                    _ownedDict[_key] = new HashSet<string>() { InternalID };
                }
                var path = MainPage.OwnedFilePath;
                var json = JsonConvert.SerializeObject(_ownedDict);
                File.WriteAllText(path, json);
                OwnedStatusChanged?.Invoke(this, this);
                OwnedStatus = "已拥有";
                NotOwned = false;
            }
            else
            {
                if (_ownedDict.TryGetValue(_key, out var list))
                {
                    list.Remove(InternalID);
                }
                else
                {
                    throw new InvalidOperationException();
                }
                var path = MainPage.OwnedFilePath;
                var json = JsonConvert.SerializeObject(_ownedDict);
                File.WriteAllText(path, json);
                OwnedStatusChanged?.Invoke(this, this);
                OwnedStatus = "";
                NotOwned = true;
            }
        }
    }
}