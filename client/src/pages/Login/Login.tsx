import { LoginButton } from "./components/LoginButton/LoginButton";
import { OceanLogo } from "../../components/OceanLogo/OceanLogo";
import styles from "./Login.module.scss";
import { RawText } from "../../components/RawText/RawText";

export const Login: React.FC = () => {
  return (
    <div className="flex flex-1 align-center justify-center flex-height-100">
      <div
        className="flex layout-column justify-center align-center"
        style={{ width: "500px" }}
      >
        <div style={{ marginInlineEnd: "40px" }}>
          <OceanLogo RawTextSize={60} ShoppingBagIconSize="40px" />
        </div>
        <div className={styles.section} style={{ width: "100%" }}>
          <RawText
            style={{ width: "100%" }}
            lineClamp={3}
            text={
              "Discover the latest trends, exclusive deals, and high-quality products tailored just for you. From fashion and accessories to electronics and home essentials, we have everything you need in one place."
            }
            fontWeight={500}
          />
          <RawText
            style={{ width: "100%", marginTop: "1rem" }}
            lineClamp={3}
            text={
              "Shop with confidence, knowing you’re getting the best value for your money."
            }
            fontWeight={500}
          />
          <RawText
            style={{ width: "100%", marginTop: "1rem" }}
            lineClamp={3}
            text={`Don't wait! Start exploring our wide range of products now and find something you love.`}
            fontWeight={500}
          />
        </div>
        <div className={styles.section} style={{ width: "100%" }}>
          <LoginButton />
        </div>
      </div>
      <img src="assets/login-img.png" className="flex-60" />
    </div>
  );
};
