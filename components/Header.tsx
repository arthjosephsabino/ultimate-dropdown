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
