import React from "react";
import { useParams } from "react-router-dom";
import { Brief } from "../components/Brief";
import { ChatWrapper } from "../components/ChatWrapper";


export default function BriefScreen()  {
  
    let { discussion_id } = useParams();

    return (
      <ChatWrapper>
        {<Brief discussion_id={discussion_id} />}
      </ChatWrapper>
    );
}
