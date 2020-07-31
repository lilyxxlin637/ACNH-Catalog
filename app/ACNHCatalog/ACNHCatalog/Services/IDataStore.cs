using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace ACNHCatalog.Services
{
    public interface IDataStore<T>
    {
        Task<bool> AddItemAsync(T item);
        Task<bool> UpdateItemAsync(T item);
        Task<bool> DeleteItemAsync(string id);
        Task<T> GetItemAsync(string id);
        Task<IEnumerable<T>> GetItemsAsync(bool forceRefresh = false);
    }

    public interface IRaiseImage
    {
        Stream RaiseImage(Stream stream);
    }
}
