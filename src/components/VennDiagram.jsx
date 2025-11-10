import React from 'react'

const VennDiagram = ({
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

  return (
    <div className="venn-diagram-container">
      {/* Four Theme Circles in a Row */}
      <div className="themes-row">
        <div className="theme-circle theme-1">
          <div className="theme-label">{showThemes ? circles[0] : '???'}</div>
        </div>
        <div className="theme-circle theme-2">
          <div className="theme-label">{showThemes ? circles[1] : '???'}</div>
        </div>
        <div className="theme-circle theme-3">
          <div className="theme-label">{showThemes ? circles[2] : '???'}</div>
        </div>
        <div className="theme-circle theme-4">
          <div className="theme-label">{showThemes ? circles[3] : '???'}</div>
        </div>
      </div>

      {/* Selected Zone Banner */}
      {selectedZone && (
        <div className="selected-zone-banner" style={getBannerStyle(selectedZone)}>
          Selected: <strong>{getZoneLabel(selectedZone)}</strong>
        </div>
      )}

      {/* 3×3 Grid */}
      <div className="grid-container">
        {zones.map(zone => {
          const word = placements[zone.id]
          const isSelected = selectedZone === zone.id

          return (
            <div
              key={zone.id}
              className={`zone ${zone.gridPos} ${isSelected ? 'selected' : ''}`}
              onClick={() => onZoneClick(zone.id)}
            >
              {/* Colored dots indicator */}
              <div className="zone-indicator">
                {zone.dots.map(color => (
                  <div key={color} className={`dot dot-${color}`}></div>
                ))}
              </div>

              {/* Placed word */}
              {word && (
                <div
                  className="word-chip placed"
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

export default VennDiagram
