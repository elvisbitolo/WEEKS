import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { fetchGenericData, clearData } from '../features/dataSlice';

interface DataFetcherProps<T> {
  url: string;
  renderItem: (item: T) => React.ReactNode;
}

export function DataFetcher<T>({ url, renderItem }: DataFetcherProps<T>) {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.dataManager);

  useEffect(() => {
    dispatch(fetchGenericData(url));

    // Cleanup store on unmount
    return () => {
      dispatch(clearData());
    };
  }, [url, dispatch]);

  if (loading) return <p style={{ textAlign: 'center' }}>🔄 Fetching remote data assets...</p>;
  if (error) return <p style={{ color: 'red', fontWeight: 'bold' }}>⚠️ Error: {error}</p>;

  return (
    <div style={{ padding: '15px', border: '1px solid #7e57c2', borderRadius: '8px', margin: '15px 0' }}>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {items.map((item, index) => (
          <li key={index} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
            {renderItem(item as T)}
          </li>
        ))}
      </ul>
    </div>
  );
}