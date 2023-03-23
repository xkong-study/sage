import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Page2 from "../../pages/page2";
import MyCombobox from "../../pages/page5";


//  npm test installation/Assigned

describe('Favourites', () => {

    test('render correctly when user logs in', async () => {

        const {container} =render(
            // eslint-disable-next-line react/react-in-jsx-scope
            <MemoryRouter>
                {/* eslint-disable-next-line react/react-in-jsx-scope */}
                <Page2 />
            </MemoryRouter>
            ,
        );
        expect(screen.getByText('Favourites')).toBeInTheDocument(); //check if title exists in page
        expect(screen.getByText('Suggestions')).toBeInTheDocument();
    });
  })
