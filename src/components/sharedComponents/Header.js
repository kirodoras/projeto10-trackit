import styled from 'styled-components';
import logo from '../../assets/logo2.png';

export default function Header({avatar}) {
    return (
        <HeaderStyle>
            <HeaderContent>
                <img src={logo} alt='Logo do TrackIt' />
                <img src={avatar} alt='Avatar User' />
            </HeaderContent>
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

    img:last-child {
        width: 51px;
        max-width: 100%;
        height: 51px;
        border-radius: 98.5px;
    }
`;

const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 375px;
    max-width: 375px;
    height: 100%;

    padding: 10px 18px 11px 18px;
`;