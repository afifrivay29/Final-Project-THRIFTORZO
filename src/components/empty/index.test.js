import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Empty from './index';

it('renders empty correctly', () => {
	const tree = renderer
		.create(
			<MemoryRouter>
				<Empty message='produk tidak ditemukan' />
			</MemoryRouter>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
