const GridDiagram = ({
  circles,
  placements,
  selectedZone,
  showThemes,
  onZoneClick,
  onWordClick
}) => {
  // Triangle layout zones configuration for 3 themes
  const zones = [
    // Top row - 1 box
    { id: '1', categories: [1], type: 'single', gridPos: 'zone-1', dots: ['red'] },
    // Middle row - 3 boxes
    { id: '12', categories: [1, 2], type: 'double', gridPos: 'zone-12', dots: ['red', 'blue'] },
    { id: '123', categories: [1, 2, 3], type: 'triple', gridPos: 'zone-123', dots: ['red', 'blue', 'yellow'] },
    { id: '13', categories: [1, 3], type: 'double', gridPos: 'zone-13', dots: ['red', 'yellow'] },
    // Bottom row - 3 boxes (wider spacing)
    { id: '2', categories: [2], type: 'single', gridPos: 'zone-2', dots: ['blue'] },
    { id: '23', categories: [2, 3], type: 'double', gridPos: 'zone-23', dots: ['blue', 'yellow'] },
    { id: '3', categories: [3], type: 'single', gridPos: 'zone-3', dots: ['yellow'] }
  ]

  // Get zone label for selected banner
  const getZoneLabel = (zoneId) => {
    const zone = zones.find(z => z.id === zoneId)
    if (!zone) return ''

    if (zone.type === 'single') {
      const catName = showThemes ? circles[zone.categories[0] - 1] : `Theme ${zone.categories[0]}`
      return `${catName} Only`
    } else if (zone.type === 'double') {
      const cats = zone.categories.map(c => showThemes ? circles[c - 1] : `Theme ${c}`)
      return cats.join(' + ')
    } else if (zone.type === 'triple') {
      return 'All Three Themes'
    }
  }

  // Get banner background style based on zone
  const getBannerStyle = (zoneId) => {
    const zone = zones.find(z => z.id === zoneId)
    if (!zone) return {}

    const gradients = {
      '1': { background: 'linear-gradient(135deg, #ff6b9d 0%, #ff1744 100%)' },
      '2': { background: 'linear-gradient(135deg, #4facfe 0%, #1976d2 100%)' },
      '3': { background: 'linear-gradient(135deg, #ffd93d 0%, #ffb300 100%)' },
      '12': { background: 'linear-gradient(135deg, #ff1744 0%, #1976d2 100%)' },
      '13': { background: 'linear-gradient(135deg, #ff1744 0%, #ffb300 100%)' },
      '23': { background: 'linear-gradient(135deg, #1976d2 0%, #ffb300 100%)' },
      '123': { background: 'linear-gradient(135deg, #ff1744 0%, #1976d2 50%, #ffb300 100%)' }
    }

    return { ...gradients[zoneId], color: 'white' }
  }

  // Helper to get dot color classes
  const getDotColor = (color) => {
    const colors = {
      red: 'bg-theme-red',
      blue: 'bg-theme-blue',
      yellow: 'bg-theme-yellow'
    }
    return colors[color]
  }

  // Helper to get theme box gradient classes
  const getThemeBoxClass = (index) => {
    const gradients = [
      'bg-gradient-to-br from-theme-red-light to-theme-red',
      'bg-gradient-to-br from-theme-blue-light to-theme-blue',
      'bg-gradient-to-br from-theme-yellow-light to-theme-yellow'
    ]
    return gradients[index]
  }

  return (
    <div className="bg-white rounded-sm p-4 sm:p-6 md:p-10 mb-6 border border-gray-200">
      {/* Three Theme Rectangles - Responsive Layout */}
      <div className="flex gap-2 sm:gap-3 max-w-[600px] mx-auto mb-6 sm:mb-8 md:mb-10 justify-center">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className={`h-[45px] sm:h-[60px] w-[110px] sm:w-[180px] rounded-lg flex items-center justify-center border-2 border-gray-300 p-2 ${getThemeBoxClass(i)}`}
          >
            <div className="font-semibold text-[9px] sm:text-[11px] text-white text-center max-w-full overflow-hidden text-ellipsis leading-tight drop-shadow">
              {showThemes ? circles[i] : '???'}
            </div>
          </div>
        ))}
      </div>

      {/* Triangle Grid Layout */}
      <div className="max-w-[600px] mx-auto">
        {/* Top row - 1 box centered */}
        <div className="flex justify-center mb-2 sm:mb-3">
          {zones.slice(0, 1).map(zone => {
            const words = placements[zone.id] || []
            const isSelected = selectedZone === zone.id

            return (
              <div
                key={zone.id}
                className={`
                  border-2 border-gray-300 rounded-xl bg-white p-2 sm:p-3 min-h-[90px] sm:min-h-[120px] w-[110px] sm:w-[180px]
                  flex flex-wrap gap-1.5 sm:gap-2 content-start cursor-pointer transition-all duration-200
                  relative hover:bg-gray-50 hover:scale-[1.02] hover:border-gray-600
                  ${isSelected ? 'bg-blue-50 shadow-[0_0_15px_rgba(33,150,243,0.3)] scale-[1.02] border-blue-600' : ''}
                `}
                onClick={() => onZoneClick(zone.id)}
              >
                {/* Colored dots indicator */}
                <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 flex gap-0.5 sm:gap-1">
                  {zone.dots.map(color => (
                    <div
                      key={color}
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shadow-md ${getDotColor(color)}`}
                    />
                  ))}
                </div>

                {/* Placed words */}
                {words.map(word => (
                  <div
                    key={word}
                    className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-sm font-light text-[11px] sm:text-xs bg-white text-gray-600 border border-gray-200 cursor-pointer transition-all hover:bg-gray-100 hover:text-[#1a1a1a] hover:border-[#1a1a1a]"
                    onClick={(e) => {
                      e.stopPropagation()
                      onWordClick(word, zone.id)
                    }}
                  >
                    {word}
                  </div>
                ))}
              </div>
            )
          })}
        </div>

        {/* Middle row - 3 boxes */}
        <div className="flex gap-2 sm:gap-3 justify-center mb-2 sm:mb-3">
          {zones.slice(1, 4).map(zone => {
            const words = placements[zone.id] || []
            const isSelected = selectedZone === zone.id

            return (
              <div
                key={zone.id}
                className={`
                  border-2 border-gray-300 rounded-xl bg-white p-2 sm:p-3 min-h-[90px] sm:min-h-[120px] w-[110px] sm:w-[180px]
                  flex flex-wrap gap-1.5 sm:gap-2 content-start cursor-pointer transition-all duration-200
                  relative hover:bg-gray-50 hover:scale-[1.02] hover:border-gray-600
                  ${isSelected ? 'bg-blue-50 shadow-[0_0_15px_rgba(33,150,243,0.3)] scale-[1.02] border-blue-600' : ''}
                `}
                onClick={() => onZoneClick(zone.id)}
              >
                {/* Colored dots indicator */}
                <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 flex gap-0.5 sm:gap-1">
                  {zone.dots.map(color => (
                    <div
                      key={color}
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shadow-md ${getDotColor(color)}`}
                    />
                  ))}
                </div>

                {/* Placed words */}
                {words.map(word => (
                  <div
                    key={word}
                    className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-sm font-light text-[11px] sm:text-xs bg-white text-gray-600 border border-gray-200 cursor-pointer transition-all hover:bg-gray-100 hover:text-[#1a1a1a] hover:border-[#1a1a1a]"
                    onClick={(e) => {
                      e.stopPropagation()
                      onWordClick(word, zone.id)
                    }}
                  >
                    {word}
                  </div>
                ))}
              </div>
            )
          })}
        </div>

        {/* Bottom row - 3 boxes */}
        <div className="flex gap-2 sm:gap-3 justify-center">
          {zones.slice(4, 7).map(zone => {
            const words = placements[zone.id] || []
            const isSelected = selectedZone === zone.id

            return (
              <div
                key={zone.id}
                className={`
                  border-2 border-gray-300 rounded-xl bg-white p-2 sm:p-3 min-h-[90px] sm:min-h-[120px] w-[110px] sm:w-[180px]
                  flex flex-wrap gap-1.5 sm:gap-2 content-start cursor-pointer transition-all duration-200
                  relative hover:bg-gray-50 hover:scale-[1.02] hover:border-gray-600
                  ${isSelected ? 'bg-blue-50 shadow-[0_0_15px_rgba(33,150,243,0.3)] scale-[1.02] border-blue-600' : ''}
                `}
                onClick={() => onZoneClick(zone.id)}
              >
                {/* Colored dots indicator */}
                <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 flex gap-0.5 sm:gap-1">
                  {zone.dots.map(color => (
                    <div
                      key={color}
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shadow-md ${getDotColor(color)}`}
                    />
                  ))}
                </div>

                {/* Placed words */}
                {words.map(word => (
                  <div
                    key={word}
                    className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-sm font-light text-[11px] sm:text-xs bg-white text-gray-600 border border-gray-200 cursor-pointer transition-all hover:bg-gray-100 hover:text-[#1a1a1a] hover:border-[#1a1a1a]"
                    onClick={(e) => {
                      e.stopPropagation()
                      onWordClick(word, zone.id)
                    }}
                  >
                    {word}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>

      {/* Selected Zone Banner */}
      {selectedZone && (
        <div
          className="mt-4 sm:mt-6 px-3 sm:px-5 py-2 sm:py-3 text-white rounded-sm text-center text-xs sm:text-sm font-normal border-0"
          style={getBannerStyle(selectedZone)}
        >
          Selected: <strong>{getZoneLabel(selectedZone)}</strong>
        </div>
      )}
    </div>
  )
}

export default GridDiagram
