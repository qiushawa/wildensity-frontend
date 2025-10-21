import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Import your chart components
import SightingRecord from "../components/Charts/SightingRecord";
import AnimalDensityChoroplethWithSpecies from "../components/Charts/AnimalDensityChoropleth";
import SpeciesBarChart from "../components/Charts/SpeciesBarChart";
import SpeciesPieChart from "../components/Charts/SpeciesPieChart";
import GlobalSpeciesBarChart from "../components/Charts/GlobalSpeciesBarChart";

// Import your newly modified hooks
import { useAreasInfo } from "../hooks/useAreasInfo";
import { useSpecies } from "../hooks/useSpecies";
import { useDAD } from "../hooks/useDAD";
import type { Area, GeoJSONFeature } from "../types";

// Helper function to convert area data to GeoJSON format for the map
function convertAreasToGeoJSON(areas: Area[]): GeoJSONFeature[] {
  return areas.map(area => ({
    type: "Feature",
    properties: {
      name: area.name,
      density: area.density
    },
    geometry: {
      type: "Polygon",
      coordinates: [area.coordinates] // GeoJSON polygons require an extra array wrapper
    }
  }));
}

const AreaMapPage: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  
  // These hooks now handle dynamic data fetching automatically
  const { areas: fetchedAreas, loading, error } = useAreasInfo();
  const { species: fetchedSpecies, loading: speciesLoading, error: speciesError } = useSpecies();
  const { DAD: sampleData, loading: DADLoading, error: DADError } = useDAD();

  // --- Loading and Error States ---
  if (loading) return <div className="text-center p-10">Loading Area Information...</div>;
  if (error) return <div className="text-center p-10 text-red-500">Error: {error.message}</div>;
  if (speciesLoading) return <div className="text-center p-10">Loading Species Data...</div>;
  if (speciesError) return <div className="text-center p-10 text-red-500">Error: {speciesError.message}</div>;
  if (DADLoading) return <div className="text-center p-10">Loading Activity Data...</div>;
  if (DADError) return <div className="text-center p-10 text-red-500">Error: {DADError.message}</div>;
  
  if (!fetchedAreas.length || !fetchedSpecies.length || !sampleData.length) {
    return <div className="text-center p-10">No data found.</div>;
  }

  const selectedAreaIndex = selectedArea
    ? fetchedAreas.findIndex(a => a.name === selectedArea)
    : undefined;

  return (
    <div className="container mx-auto p-4">

      <section>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Map */}
          <div className="lg:w-1/3 w-full h-[800px]">
            <AnimalDensityChoroplethWithSpecies
              areas={convertAreasToGeoJSON(fetchedAreas)}
              species={fetchedSpecies}
              setSelectedArea={setSelectedArea}
            />
          </div>

          {/* Right-side Charts */}
          <div className="lg:w-2/3 w-full flex flex-col gap-6">
            {/* Sighting Record chart for selected area */}
            {selectedAreaIndex !== undefined && (
              <>
                <h1 className="text-4xl text-center mt-12">{selectedArea}</h1>
                <div className="h-[325px]">
                  <SightingRecord
                    data={sampleData as any}  // Temporarily cast to any to bypass type issues
                    species={fetchedSpecies}
                    selectedAreaIndex={selectedAreaIndex}
                  />
                </div>
              </>
            )}

            {/* Transitioning Charts */}
            <AnimatePresence mode="wait">
              {selectedArea ? (
                <motion.div
                  key="area-charts"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col sm:flex-row gap-6"
                >
                  <div className="sm:w-1/2 h-[325px]">
                    <SpeciesBarChart
                      selectedArea={selectedArea}
                      areas={fetchedAreas}
                      species={fetchedSpecies}
                    />
                  </div>
                  <div className="sm:w-1/2 h-[325px]">
                    <SpeciesPieChart
                      selectedArea={selectedArea}
                      areas={fetchedAreas}
                      species={fetchedSpecies}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="global-chart"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col sm:flex-row gap-6"
                >
                  <div className="sm:w-full h-[325px]">
                    <GlobalSpeciesBarChart areas={fetchedAreas} species={fetchedSpecies} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AreaMapPage;
