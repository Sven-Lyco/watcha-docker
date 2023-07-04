import styled from 'styled-components';
import defaultPoster from '../../assets/images/poster.png';

interface IPosterProps {
  src: string;
  alt: string;
  isWatched?: boolean;
}

export default function Poster({
  src = defaultPoster,
  alt = '',
  isWatched,
}: IPosterProps): JSX.Element {
  return (
    <Image
      src={src}
      alt={alt}
      width="300"
      height="450"
      loading="lazy"
      isWatched={isWatched}
    />
  );
}

const Image = styled.img<{ isWatched: boolean | undefined }>`
  display: flex;
  width: 120px;
  height: auto;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  box-shadow: ${({ isWatched }) => (isWatched ? '0px 0px 6px #ffff00' : '')};
`;
