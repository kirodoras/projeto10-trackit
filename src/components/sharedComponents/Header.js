import styled from 'styled-components';
import logo from '../../assets/logo2.png';

export default function Header() {
    return (
        <HeaderStyle>
            <div className='headerContent'>
                <img src={logo} alt='Logo do TrackIt' />
                <img src='https://i.pinimg.com/236x/a4/4a/f3/a44af3bb5f074e3cdb4be8a56232c996.jpg' alt='Avatar User' />
            </div>
        </HeaderStyle>
    );
}

const HeaderStyle = styled.header`
    display: flex;
    justify-content: center;


    position: fixed;
    top: 0;
    left: 0;
    
    width: 100%;
    max-width: 100%;
    height: 70px;

    background: var(--color-dark-blue);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    .headerContent {
        display: flex;
        justify-content: space-between;
        align-items: center;

        width: 375px;
        max-width: 375px;
        height: 100%;

        padding: 10px 18px 11px 18px;
    }

    img:last-child {
        width: 51px;
        max-width: 100%;
        height: 51px;
        border-radius: 98.5px;
    }
`;