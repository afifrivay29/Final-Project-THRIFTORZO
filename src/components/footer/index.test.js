import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Footer from './index.js';

it('renders footer correctly', () => {
	const tree = renderer
		.create(
			<MemoryRouter>
				<Footer />
			</MemoryRouter>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
