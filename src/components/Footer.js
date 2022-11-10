function Footer() {
  const data = new  Date()
  return (
    <footer className="footer page__footer">
      <p className="footer__name">&copy; {data.getFullYear()} Mesto Russia</p>
    </footer>
  );
}
export default Footer;
