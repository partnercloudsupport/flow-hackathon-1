
import Button from "@/components/ui/CustomButton";
import useWindowSize from "@/hooks/useWindowSize";
import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./index.module.scss";

type Props = {
    onNext: () => void;
};
const FloatInfoSection = ({
    onNext
}: Props) => {
    const width = useWindowSize().width;
    const [eventName, setEventName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState(1);
    const [postPurchaseUrl, setPostPurchaseUrl] = useState("");
    const inputFile = useRef<HTMLInputElement | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (reader.result) {
                    setImage(reader.result.toString());
                }
            };
        }
    };

    const onNextStepHandler = () => {
        if (eventName.length === 0 || price === 0 || postPurchaseUrl.length === 0) {
            alert("Please fill out all required fields");
            return;
        }
        onNext();
    }


    return (
        <div className={styles.container}>
            <div className={styles.labelValueSection}>
                <p className={styles.label}>Event Name <p className={styles.requiredDot}> *</p></p>
                <input placeholder="Event Name" className={styles.eventInput} type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
            </div>
            <div className={styles.labelValueSection}>
                <p className={styles.label}>Description</p>
                <textarea placeholder="Description" className={styles.descriptionInput} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className={styles.labelValueSection}>
                <p className={styles.label}>Image</p>
                <input
                    style={{
                        display: "hidden",
                        width: 0,
                        height: 0,
                    }}
                    id="file"
                    ref={inputFile}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e)}
                />
                <div className={styles.imgCardSection}>
                    <div className={styles.imgCard} onClick={() => { inputFile.current?.click() }}>
                        {image.length > 0 && (
                            <Image
                                src={image}
                                alt="nft"
                                width={221}
                                height={181}
                                className={styles.nftImg}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.labelValueSection}>
                <p className={styles.label}>Price  <p className={styles.requiredDot}> *</p></p>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <div style={{ width: "20%" }}>
                        <input placeholder="Currency" disabled className={styles.eventInput} type="text" value={"FLOW"} />
                    </div>
                    <div style={{ width: "75%" }}>
                        <input placeholder="Price" className={styles.eventInput} style={{ paddingLeft: "2rem" }} type="number" value={price} onChange={(e) => setPrice(+e.target.value)} />
                    </div>
                </div>
                <p className={styles.labelNotice}>Make sure price on the contract is the same</p>
            </div>
            <div className={styles.labelValueSection}>
                <p className={styles.label}>Post-Purchase Redirect URL <p className={styles.requiredDot}> *</p></p>
                <input placeholder="Redirect URL" className={styles.eventInput} type="text" value={postPurchaseUrl} onChange={(e) => setPostPurchaseUrl(e.target.value)} />
                <p className={styles.labelNotice}>Users will be redirected to purchase page for failed transactions</p>
            </div>
            <div className={styles.btnSection}>
                <Button
                    color="white"
                    onClick={() => { onNextStepHandler() }}
                    width="200px"
                    height="52px"
                    fontSize={20}
                    fontWeight={300}
                    bgColor='#BF3DDB'
                    text={"Next"}
                ></Button>
            </div>
        </div>
    );
};
export default FloatInfoSection;