import {
  Card as MTCard,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

const Card = ({
  imageUrl,
  title,
  description,
  button,
  customButton,
  ...rest
}) => {
  return (
    <MTCard className="w-fit max-w-[26rem] shadow-lg" {...rest}>
      {imageUrl && (
        <CardHeader floated={false} color="blue-gray">
          <img src={imageUrl} alt={title || "Card Image"} />
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
          <IconButton
            size="sm"
            color="red"
            variant="text"
            className="!absolute top-4 right-4 rounded-full"
          >
            {/* Close button icon */}
          </IconButton>
        </CardHeader>
      )}

      <CardBody>
        {title && (
          <div className="mb-3 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="font-medium">
              {title}
            </Typography>
          </div>
        )}
        {description && <Typography color="gray">{description}</Typography>}
      </CardBody>

      <CardFooter className="pt-3">
        {button && (
          <Button size="lg" fullWidth={true}>
            {button}
          </Button>
        )}
        {customButton}
      </CardFooter>
    </MTCard>
  );
};

// Setting defaultProps in case they aren't provided
Card.defaultProps = {
  title: "Default Title",
  description: "This is the default description.",
};

export default Card;
