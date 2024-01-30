import "./Footer.css";
const template = () => `
<h3><span>With 💘 to </span> Neoland <span> - Don't worry, be happy!</span></h3>
`;

export const PrintTemplateFooter = () => {
  document.querySelector("footer").innerHTML = template();
};
