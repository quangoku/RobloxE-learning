import React from "react";

export default function Video({
  videoPlayBackId,
}: {
  videoPlayBackId: string;
}) {
  return (
    <video
      className="rounded-md "
      src={`https://${process.env.CLOUDFRONT_DOMAIN}/${videoPlayBackId}`}
      controls
      autoPlay={true}
    ></video>
  );
}
