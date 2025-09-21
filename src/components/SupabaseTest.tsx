import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

export const SupabaseTest = () => {
  const [data, setData] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data: result, error } = await supabase.from('Room-Buddies Login').select('*').limit(5)
        if (error) {
          setError(error.message)
        } else {
          setData(result || [])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    }

    testConnection()
  }, [])

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Supabase Connection Test</h2>
      <p>Connected to "Room-Buddies Login" table</p>
      <p>Records found: {data.length}</p>
    </div>
  )
}