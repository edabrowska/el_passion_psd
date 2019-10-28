const breakpoints = {
  xs: 480,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1440,
}

const generateMediaQueries = (breakpoints) => {
  const queries = {}
  for (const breakpoint in breakpoints) {
    const bp = breakpoints[breakpoint]
    queries[breakpoint] = `@media (min-width: ${bp}px)`
  }
  return queries
}

export default generateMediaQueries(breakpoints)
