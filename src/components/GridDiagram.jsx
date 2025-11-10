import React from 'react'

const GridDiagram = ({
  circles,
  placements,
  selectedZone,
  showThemes,
  onZoneClick,
  onWordClick
}) => {
  // 3×3 Grid zones configuration for 4 themes
  const zones = [
    // Row 1
    { id: '1', categories: [1], type: 'single', gridPos: 'zone-1', dots: ['red'] },
    { id: '12', categories: [1, 2], type: 'double', gridPos: 'zone-12', dots: ['red', 'blue'] },
    { id: '2', categories: [2], type: 'single', gridPos: 'zone-2', dots: ['blue'] },
    // Row 2
    { id: '13', categories: [1, 3], type: 'double', gridPos: 'zone-13', dots: ['red', 'green'] },
    { id: '1234', categories: [1, 2, 3, 4], type: 'quad', gridPos: 'zone-1234', dots: ['red', 'blue', 'green', 'yellow'] },
    { id: '24', categories: [2, 4], type: 'double', gridPos: 'zone-24', dots: ['blue', 'yellow'] },
    // Row 3
    { id: '3', categories: [3], type: 'single', gridPos: 'zone-3', dots: ['green'] },
    { id: '34', categories: [3, 4], type: 'double', gridPos: 'zone-34', dots: ['green', 'yellow'] },
    { id: '4', categories: [4], type: 'single', gridPos: 'zone-4', dots: ['yellow'] }
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
    } else if (zone.type === 'quad') {
      return 'All Four Themes'
    }
  }

  // Get banner background style based on zone
  const getBannerStyle = (zoneId) => {
    const zone = zones.find(z => z.id === zoneId)
    if (!zone) return {}

    const gradients = {
      '1': { background: 'linear-gradient(135deg, #ff6b9d 0%, #ff1744 100%)' },
      '2': { background: 'linear-gradient(135deg, #4facfe 0%, #1976d2 100%)' },
      '3': { background: 'linear-gradient(135deg, #66bb6a 0%, #4caf50 100%)' },
      '4': { background: 'linear-gradient(135deg, #ffd93d 0%, #ffb300 100%)' },
      '12': { background: 'linear-gradient(135deg, #ff1744 0%, #1976d2 100%)' },
      '13': { background: 'linear-gradient(135deg, #ff1744 0%, #4caf50 100%)' },
      '24': { background: 'linear-gradient(135deg, #1976d2 0%, #ffb300 100%)' },
      '34': { background: 'linear-gradient(135deg, #4caf50 0%, #ffb300 100%)' },
      '1234': { background: 'linear-gradient(135deg, #ff1744 0%, #1976d2 33%, #4caf50 66%, #ffb300 100%)' }
    }

    return { ...gradients[zoneId], color: 'white' }
  }

  // Helper to get dot color classes
  const getDotColor = (color) => {
    const colors = {
      red: 'bg-theme-red',
      blue: 'bg-theme-blue',
      green: 'bg-theme-green',
      yellow: 'bg-theme-yellow'
    }
    return colors[color]
  }

  // Helper to get theme box gradient classes
  const getThemeBoxClass = (index) => {
    const gradients = [
      'bg-gradient-to-br from-theme-red-light to-theme-red',
      'bg-gradient-to-br from-theme-blue-light to-theme-blue',
      'bg-gradient-to-br from-theme-green-light to-theme-green',
      'bg-gradient-to-br from-theme-yellow-light to-theme-yellow'
    ]
    return gradients[index]
  }

  return (
    <div className="bg-white rounded-sm p-10 mb-6 border border-gray-200">
      {/* Four Theme Rectangles in 2x2 Grid */}
      <div className="grid grid-cols-2 gap-3 max-w-[400px] mx-auto mb-8">
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className={`h-[60px] rounded-lg flex items-center justify-center border-2 border-gray-300 p-2 ${getThemeBoxClass(i)}`}
          >
            <div className="font-semibold text-[11px] text-white text-center max-w-full overflow-hidden text-ellipsis leading-tight drop-shadow">
              {showThemes ? circles[i] : '???'}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Zone Banner */}
      {selectedZone && (
        <div
          className="mt-5 px-5 py-3 text-[#1a1a1a] rounded-sm text-center text-sm font-normal border border-gray-200"
          style={getBannerStyle(selectedZone)}
        >
          Selected: <strong>{getZoneLabel(selectedZone)}</strong>
        </div>
      )}

      {/* 3×3 Grid */}
      <div className="grid grid-cols-3 gap-3 max-w-[500px] mx-auto">
        {zones.map(zone => {
          const word = placements[zone.id]
          const isSelected = selectedZone === zone.id

          return (
            <div
              key={zone.id}
              className={`
                border-2 border-gray-300 rounded-xl bg-white p-3 min-h-[120px]
                flex flex-wrap gap-2 content-start cursor-pointer transition-all duration-200
                relative hover:bg-gray-50 hover:scale-[1.02] hover:border-gray-600
                ${isSelected ? 'bg-blue-50 shadow-[0_0_15px_rgba(33,150,243,0.3)] scale-[1.02] border-blue-600' : ''}
              `}
              onClick={() => onZoneClick(zone.id)}
            >
              {/* Colored dots indicator */}
              <div className="absolute top-2 right-2 flex gap-1">
                {zone.dots.map(color => (
                  <div
                    key={color}
                    className={`w-3 h-3 rounded-full shadow-md ${getDotColor(color)}`}
                  />
                ))}
              </div>

              {/* Placed word */}
              {word && (
                <div
                  className="px-3.5 py-2 rounded-sm font-light text-xs bg-white text-gray-600 border border-gray-200 cursor-pointer transition-all hover:bg-gray-100 hover:text-[#1a1a1a] hover:border-[#1a1a1a]"
                  onClick={(e) => {
                    e.stopPropagation()
                    onWordClick(word, zone.id)
                  }}
                >
                  {word}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GridDiagram
