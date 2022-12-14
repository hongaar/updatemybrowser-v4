import { fetchMap } from "@updatemybrowser/updater";
import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 12px;
`;

const Pre = styled.pre`
  margin-top: 0;
  background-color: #e2e2e2;
  padding: 12px;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 8px;
`;

const Status = styled.pre``;

export function SourcePreview({ document }) {
  const [loading, setLoading] = useState(false);
  const [version, setVersion] = useState(null);
  const [error, setError] = useState(null);

  const { displayed } = document;
  const fetchFn = fetchMap[displayed._type];

  async function fetch() {
    setLoading(true);
    setVersion(null);
    setError(null);
    try {
      setVersion(await fetchFn(displayed));
    } catch (error) {
      console.info(error);
      setError(error);
    }
    setLoading(false);
  }

  return (
    <Wrapper>
      <Pre>{JSON.stringify(displayed, undefined, 2)}</Pre>
      <Button onClick={fetch}>Fetch &amp; preview version</Button>
      {loading && <Status>Loading...</Status>}
      {error && <Status>Could not fetch version: {error.message}</Status>}
      {version && <Status>Current version: {version}</Status>}
    </Wrapper>
  );
}
