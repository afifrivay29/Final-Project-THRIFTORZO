import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Category from '../../components/category';

it('renders category correctly', () => {
	const tree = renderer
		.create(
			<MemoryRouter>
				<Category category='Hobi' active />
				<Category category='Kendaraan' />
			</MemoryRouter>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
