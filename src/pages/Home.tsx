import AreaMap from '../components/MapComponents/AreaMap';

const Home: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-green-700 mb-4">樣區地圖</h3>
        <div className="h-128 bg-gray-200 flex items-center justify-center">
            <AreaMap />
        </div>
      </div>

    </div>
  );
};

export default Home;