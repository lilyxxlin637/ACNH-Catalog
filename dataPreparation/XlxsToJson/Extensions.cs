namespace XlxsToJson
{
    public static class Extensions
    {
        public static TResult Clone<TSource, TResult>(this TSource source) where TSource : TResult where TResult : new()
        {
            var props = typeof(TResult).GetProperties();
            var result = new TResult();
            foreach (var p in props)
            {
                p.SetValue(result, p.GetValue(source));
            }

            return result;
        }
    }
}
