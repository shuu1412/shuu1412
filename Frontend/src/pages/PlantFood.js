
import PlantFoodDemo from '../components/PlantFoodDemo/PlantFoodDemo.js';
import PlantFoodDetail from '../components/PlantFoodDetail/PlantFoodDetail.js';
import UsePlantFood from '../components/UsePlantFood/UsePlantFood.js';
function PlantFood() {
	return ( 
		<div className='PlantFood'>
			<PlantFoodDemo/>
			<PlantFoodDetail/>
			<UsePlantFood/>
		</div>
	);
}
export default PlantFood;