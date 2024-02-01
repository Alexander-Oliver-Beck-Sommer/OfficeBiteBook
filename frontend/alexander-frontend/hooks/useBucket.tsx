import { useState, useEffect } from "react";
import { supabase } from "@/components/Supabase/supabaseClient";

const useBucket = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadFile = async (bucket: string, path: string, file: File) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: "3600",
          upsert: true,
        });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getFileUrl = async (bucket, path) => {
    try {
      const { data } = supabase.storage.from(bucket).getPublicUrl(path);

      return data.publicUrl;
    } catch (error) {
      setError(error.message);
      return null;
    }
  };

  const deleteFile = async (bucket, path) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .remove([path]); // Supabase remove() expects an array of paths

      if (error) {
        throw error;
      }

      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateFile = async (bucket: string, path: string, file: File) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: "3600",
          upsert: true, // Use upsert: true to indicate an update intent
        });

      if (error) {
        throw error;
      }

      return data; // Assuming the data includes the necessary details post-upload
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { uploadFile, getFileUrl, deleteFile, updateFile, loading, error };
};

export default useBucket;
