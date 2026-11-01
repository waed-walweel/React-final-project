import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import useCategories from '../../hook/useCategories'

export default function Categories() {
  const { data, isLoading, isError } = useCategories()

  if (isLoading) return <CircularProgress color="inherit" />
  if (isError) return <Alert severity="error">Failed to load categories</Alert>

  return (
    <div>
      <h1>Categories</h1>
      {data.data.map((category) => (
        <p key={category.id}>{category.name}</p>
      ))}
    </div>
  )
}
