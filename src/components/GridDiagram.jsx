const GridDiagram = ({
  circles,
  placements,
  selectedZone,
  showThemes,
  onZoneClick,
  onWordClick,
  onWordDrop,
}) => {
  // Triangle layout zones configuration for 3 themes
  const zones = [
    // Top row - 1 box
    {
      id: "1",
      categories: [1],
      type: "single",
      gridPos: "zone-1",
      dots: ["teal"],
    },
    // Middle row - 3 boxes
    {
      id: "12",
      categories: [1, 2],
      type: "double",
      gridPos: "zone-12",
      dots: ["teal", "purple"],
    },
    {
      id: "123",
      categories: [1, 2, 3],
      type: "triple",
      gridPos: "zone-123",
      dots: ["teal", "purple", "orange"],
    },
    {
      id: "13",
      categories: [1, 3],
      type: "double",
      gridPos: "zone-13",
      dots: ["teal", "orange"],
    },
    // Bottom row - 3 boxes (wider spacing)
    {
      id: "2",
      categories: [2],
      type: "single",
      gridPos: "zone-2",
      dots: ["purple"],
    },
    {
      id: "23",
      categories: [2, 3],
      type: "double",
      gridPos: "zone-23",
      dots: ["purple", "orange"],
    },
    {
      id: "3",
      categories: [3],
      type: "single",
      gridPos: "zone-3",
      dots: ["orange"],
    },
  ];

  // Helper to get dot color classes
  const getDotColor = (color) => {
    const colors = {
      teal: "bg-theme-teal",
      purple: "bg-theme-purple",
      orange: "bg-theme-orange",
    };
    return colors[color];
  };

  // Helper to get theme box gradient classes
  const getThemeBoxClass = (index) => {
    const gradients = [
      "bg-gradient-to-br from-theme-teal-light to-theme-teal",
      "bg-gradient-to-br from-theme-purple-light to-theme-purple",
      "bg-gradient-to-br from-theme-orange-light to-theme-orange",
    ];
    return gradients[index];
  };

  // Check if a theme index should be highlighted based on selected zone
  const isThemeActive = (themeIndex) => {
    if (!selectedZone) return false;
    const zone = zones.find((z) => z.id === selectedZone);
    if (!zone) return false;
    // themeIndex is 0-based, categories are 1-based
    return zone.categories.includes(themeIndex + 1);
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("ring-2", "ring-blue-400", "ring-offset-2");
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove(
      "ring-2",
      "ring-blue-400",
      "ring-offset-2"
    );
  };

  const handleDrop = (e, zoneId) => {
    e.preventDefault();
    e.currentTarget.classList.remove(
      "ring-2",
      "ring-blue-400",
      "ring-offset-2"
    );

    const word = e.dataTransfer.getData("text/plain");
    if (word && onWordDrop) {
      onWordDrop(word, zoneId);
    }
  };

  return (
    <div className="bg-white rounded-sm p-4 sm:p-6 md:p-10 mb-6">
      {/* Three Theme Rectangles - Responsive Layout */}
      <div className="flex gap-2 sm:gap-3 max-w-[600px] mx-auto mb-6 sm:mb-8 md:mb-10 justify-center">
        {[0, 1, 2].map((i) => {
          const isActive = isThemeActive(i);
          const hasSelection = selectedZone !== null;

          return (
            <div
              key={`${i}-${selectedZone || "none"}`}
              className={`
                h-[45px] sm:h-[60px] w-[110px] sm:w-[180px] rounded-lg flex items-center justify-center border-2 p-2
                ${getThemeBoxClass(i)}
                ${
                  isActive
                    ? "border-white animate-pulse-bright shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                    : "border-gray-300"
                }
                ${hasSelection && !isActive ? "opacity-30" : "opacity-100"}
                transition-opacity duration-300
              `}
            >
              <div className="font-semibold text-[9px] sm:text-[11px] text-white text-center max-w-full overflow-hidden text-ellipsis leading-tight drop-shadow">
                {showThemes ? circles[i] : "???"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Triangle Grid Layout */}
      <div className="max-w-[600px] mx-auto">
        {/* Top row - 1 box centered */}
        <div className="flex justify-center mb-2 sm:mb-3">
          {zones.slice(0, 1).map((zone) => {
            const words = placements[zone.id] || [];
            const isSelected = selectedZone === zone.id;

            return (
              <div
                key={zone.id}
                className={`
                  border-2 border-gray-300 rounded-xl bg-white p-2 sm:p-3 min-h-[90px] sm:min-h-[120px] w-[110px] sm:w-[180px]
                  flex flex-col gap-1.5 sm:gap-2 cursor-pointer transition-all duration-200
                  relative hover:bg-gray-50 hover:scale-[1.02] hover:border-gray-600
                  ${
                    isSelected
                      ? "bg-gray-50 shadow-[0_0_15px_rgba(33,150,243,0.3)] scale-[1.02] border-gray-600"
                      : ""
                  }
                `}
                onClick={() => onZoneClick(zone.id)}
                onDragOver={handleDragOver}
                onDragEnter={(e) => handleDragEnter(e, zone.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, zone.id)}
              >
                {/* Colored dots indicator */}
                <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 flex gap-0.5 sm:gap-1">
                  {zone.dots.map((color) => (
                    <div
                      key={color}
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shadow-md ${getDotColor(
                        color
                      )}`}
                    />
                  ))}
                </div>

                {/* Placed words */}
                {words.map((word) => (
                  <div
                    key={word}
                    className="w-full px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-sm font-light text-[11px] sm:text-xs bg-white text-gray-600 border border-gray-200 cursor-pointer transition-all hover:bg-gray-100 hover:text-[#1a1a1a] hover:border-[#1a1a1a] text-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      onWordClick(word, zone.id);
                    }}
                  >
                    {word}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Middle row - 3 boxes */}
        <div className="flex gap-2 sm:gap-3 justify-center mb-2 sm:mb-3">
          {zones.slice(1, 4).map((zone) => {
            const words = placements[zone.id] || [];
            const isSelected = selectedZone === zone.id;

            return (
              <div
                key={zone.id}
                className={`
                  border-2 border-gray-300 rounded-xl bg-white p-2 sm:p-3 min-h-[90px] sm:min-h-[120px] w-[110px] sm:w-[180px]
                  flex flex-col gap-1.5 sm:gap-2 cursor-pointer transition-all duration-200
                  relative hover:bg-gray-50 hover:scale-[1.02] hover:border-gray-600
                  ${
                    isSelected
                      ? "bg-gray-50 shadow-[0_0_15px_rgba(33,150,243,0.3)] scale-[1.02] border-gray-600"
                      : ""
                  }
                `}
                onClick={() => onZoneClick(zone.id)}
                onDragOver={handleDragOver}
                onDragEnter={(e) => handleDragEnter(e, zone.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, zone.id)}
              >
                {/* Colored dots indicator */}
                <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 flex gap-0.5 sm:gap-1">
                  {zone.dots.map((color) => (
                    <div
                      key={color}
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shadow-md ${getDotColor(
                        color
                      )}`}
                    />
                  ))}
                </div>

                {/* Placed words */}
                {words.map((word) => (
                  <div
                    key={word}
                    className="w-full px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-sm font-light text-[11px] sm:text-xs bg-white text-gray-600 border border-gray-200 cursor-pointer transition-all hover:bg-gray-100 hover:text-[#1a1a1a] hover:border-[#1a1a1a] text-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      onWordClick(word, zone.id);
                    }}
                  >
                    {word}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Bottom row - 3 boxes */}
        <div className="flex gap-2 sm:gap-3 justify-center">
          {zones.slice(4, 7).map((zone) => {
            const words = placements[zone.id] || [];
            const isSelected = selectedZone === zone.id;

            return (
              <div
                key={zone.id}
                className={`
                  border-2 border-gray-300 rounded-xl bg-white p-2 sm:p-3 min-h-[90px] sm:min-h-[120px] w-[110px] sm:w-[180px]
                  flex flex-col gap-1.5 sm:gap-2 cursor-pointer transition-all duration-200
                  relative hover:bg-gray-50 hover:scale-[1.02] hover:border-gray-600
                  ${
                    isSelected
                      ? "bg-gray-50 shadow-[0_0_15px_rgba(33,150,243,0.3)] scale-[1.02] border-gray-600"
                      : ""
                  }
                `}
                onClick={() => onZoneClick(zone.id)}
                onDragOver={handleDragOver}
                onDragEnter={(e) => handleDragEnter(e, zone.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, zone.id)}
              >
                {/* Colored dots indicator */}
                <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 flex gap-0.5 sm:gap-1">
                  {zone.dots.map((color) => (
                    <div
                      key={color}
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shadow-md ${getDotColor(
                        color
                      )}`}
                    />
                  ))}
                </div>

                {/* Placed words */}
                {words.map((word) => (
                  <div
                    key={word}
                    className="w-full px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-sm font-light text-[11px] sm:text-xs bg-white text-gray-600 border border-gray-200 cursor-pointer transition-all hover:bg-gray-100 hover:text-[#1a1a1a] hover:border-[#1a1a1a] text-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      onWordClick(word, zone.id);
                    }}
                  >
                    {word}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GridDiagram;
