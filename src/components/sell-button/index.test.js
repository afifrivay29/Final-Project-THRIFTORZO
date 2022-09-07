import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import SellButton from '../../components/sell-button';

it('renders product card correctly', () => {
	const tree = renderer
		.create(
			<MemoryRouter>
				<SellButton />
			</MemoryRouter>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
