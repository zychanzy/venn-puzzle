import React from 'react'

const VennDiagram = ({
  circles,
  placements,
  selectedZone,
  showThemes,
  onZoneClick,
  onWordClick
}) => {
  const zones = [
    { id: 'only-1', label: showThemes ? circles[0] : '???', position: 'top-left' },
    { id: 'only-2', label: showThemes ? circles[1] : '???', position: 'top-right' },
    { id: 'only-3', label: showThemes ? circles[2] : '???', position: 'bottom' },
    { id: '1-2', label: '1 & 2', position: 'top-center' },
    { id: '1-3', label: '1 & 3', position: 'left-center' },
    { id: '2-3', label: '2 & 3', position: 'right-center' },
    { id: 'center', label: 'All Three', position: 'center' }
  ]

  return (
    <div className="venn-diagram-container">
      <div className="venn-diagram">
        {/* SVG Circles */}
        <svg className="venn-svg" viewBox="0 0 400 350">
          <circle cx="150" cy="120" r="100" className="circle circle-1" />
          <circle cx="250" cy="120" r="100" className="circle circle-2" />
          <circle cx="200" cy="200" r="100" className="circle circle-3" />
        </svg>

        {/* Interactive Zones */}
        {zones.map(zone => {
          const words = placements[zone.id] || []
          const isSelected = selectedZone === zone.id

          return (
            <div
              key={zone.id}
              className={`zone zone-${zone.position} ${isSelected ? 'selected' : ''}`}
              onClick={() => onZoneClick(zone.id)}
            >
              <div className="zone-label">{zone.label}</div>
              <div className="zone-words">
                {words.map(word => (
                  <div
                    key={word}
                    className="word-chip placed"
                    onClick={(e) => {
                      e.stopPropagation()
                      onWordClick(word, zone.id)
                    }}
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {selectedZone && (
        <div className="selected-zone-banner">
          Selected Zone: <strong>{zones.find(z => z.id === selectedZone)?.label}</strong>
        </div>
      )}
    </div>
  )
}

export default VennDiagram
