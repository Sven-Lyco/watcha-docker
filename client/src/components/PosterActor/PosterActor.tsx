import styled from 'styled-components';
import defaultPoster from '../../assets/images/profile.png';

interface IPosterActorProps {
  src: string;
  alt: string;
  isWatched?: boolean;
}

export default function PosterActor({
  src = defaultPoster,
  alt = '',
}: IPosterActorProps): JSX.Element {
  return <Image src={src} alt={alt} width="300" height="450" loading="lazy" />;
}

const Image = styled.img`
  display: flex;
  width: 120px;
  height: auto;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
`;
