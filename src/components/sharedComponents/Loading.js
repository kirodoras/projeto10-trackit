import {ThreeDots} from 'react-loader-spinner';

export default function Loading ({size}){
    return (
        <ThreeDots color='#FFFFFF' height={size} width={size} />
    );
}