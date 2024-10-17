import {
  Card as MTCard,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";

const Card = ({ imageUrl, title, description, button, ...rest }) => {
  return (
    <MTCard className="w-full max-w-[26rem] shadow-lg" {...rest}>
      {/* Conditionally render CardHeader if imageUrl is provided */}
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
        {/* Conditionally render title if provided */}
        {title && (
          <div className="mb-3 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="font-medium">
              {title}
            </Typography>
          </div>
        )}

        {/* Conditionally render description if provided */}
        {description && <Typography color="gray">{description}</Typography>}
      </CardBody>

      {/* Conditionally render footer with button */}
      {button && (
        <CardFooter className="pt-3">
          <Button size="lg" fullWidth={true}>
            {button}
          </Button>
        </CardFooter>
      )}
    </MTCard>
  );
};

// Setting defaultProps in case they aren't provided
Card.defaultProps = {
  title: "Default Title",
  description: "This is the default description.",
  button: "Button",
};

export default Card;
