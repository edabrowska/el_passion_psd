export default (story) => {
  return <div style={{ padding: '50px' }}>
    {story()}
  </div>
}
