import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Product from '../../components/product';

it('renders product card correctly', () => {
	const tree = renderer
		.create(
			<MemoryRouter>
				<Product
					img='http://res.cloudinary.com/amnesiac/image/upload/v1658150925/secondhand/product/ntuemunelbg9oedur6gr.jpg'
					title='Avanza'
					category='Kendaraan'
					price='250000000'
					link='5aace31a-3196-4d17-801f-017cd28ed7b1'
				/>
			</MemoryRouter>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
