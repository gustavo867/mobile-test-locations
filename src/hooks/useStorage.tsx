import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useStorage<T = { name: string; country: string }>(key: string) {
  const [data, setData] = useState<T | undefined>(undefined);
  const loading = useRef(true);

  const getStorage = useCallback(async () => {
    const data = await AsyncStorage.getItem(key);

    if (!data) {
      loading.current = false;
    } else {
      setData(JSON.parse(data));
      loading.current = false;
    }
  }, [key]);

  useEffect(() => {
    getStorage();

    return () => {
      loading.current = false;
    };
  }, []);

  const values = useMemo(
    () => ({
      data,
      loading,
    }),
    [data, loading]
  );

  return values;
}

export { useStorage };
