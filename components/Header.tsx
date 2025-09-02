/**
 * Header component that displays a gradient-shining H1 text.
 *
 * The text has a linear gradient applied and an animation that creates a "shining" effect.
 *
 * @param {Object} props - Component props.
 * @param {string} props.content - The text content to display inside the header.
 *
 * @returns {JSX.Element} A styled H1 element with gradient shine animation.
 *
 * @example
 * ```tsx
 * <Header content="Welcome to My App" />
 * ```
 */

interface Props {
  content: string;
}

const Header = ({ content }: Props) => {
  return (
    <h1 className="text-6xl font-bold relative text-transparent bg-gradient-to-r from-violet-700 via-violet-500 to-fuchsia-700 bg-[length:200%_100%] bg-clip-text animate-shine">
      {content}
    </h1>
  );
};

export default Header;
