import Link from "next/link";
import { Fragment } from "react";
import DocumentationLayout from "../components/DocumentationLayout";
import { getModules } from "../services/jsdocs";
import Anchor from "../components/Anchor";

const packageName = "functional-game-utils";

function createGithubLink({ filename, lineno, path }) {
  const [, relativePath] = path.split(packageName);

  return `https://github.com/rmkubik/${packageName}/blob/master${relativePath}/${filename}#L${lineno}`;
}

const DocumentationNav = ({ modules }) => {
  return (
    <nav>
      <ul>
        {modules.map(([module, blocks]) => {
          return (
            <Fragment key={module}>
              <li>
                <Link href={`#${module}`} scroll={false}>
                  <a>
                    {module[0].toUpperCase() + module.substring(1)}{" "}
                    <span>module</span>
                  </a>
                </Link>
              </li>
              {blocks.map((block) => (
                <li key={block.name}>
                  <Link href={`#${block.name}`} scroll={false}>
                    <a>
                      {block.name} <span>{block.kind}</span>
                    </a>
                  </Link>
                </li>
              ))}
            </Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

const Home = ({ modules }) => {
  const moduleEntries = Object.entries(modules).sort(([a], [b]) =>
    a.localeCompare(b)
  );
  return (
    <DocumentationLayout>
      <DocumentationNav modules={moduleEntries} />
      <main>
        {moduleEntries.map(([module, blocks]) => {
          return (
            <Fragment key={module}>
              <h3>
                <Anchor id={module} />
                {module[0].toUpperCase() + module.substring(1)}
              </h3>
              {blocks.map((block) => (
                <div key={block.name}>
                  <h4>
                    <Anchor id={block.name} />
                    {block.name} - {block.kind}
                  </h4>
                  <p>{block.description}</p>
                  <h5>Params</h5>
                  <ul>
                    {block.params?.map((param) => (
                      <li>
                        {param.name} - {param.type.names[0]} -{" "}
                        {param.description}
                      </li>
                    ))}
                  </ul>
                  <h5>Returns</h5>
                  <ul>
                    {block.returns?.map((value) => (
                      <li>
                        {value.type.names[0]} - {value.description}
                      </li>
                    ))}
                  </ul>
                  <Link href={createGithubLink(block.meta)}>View Source</Link>
                  {/* <pre>{JSON.stringify(block, undefined, 2)}</pre> */}
                </div>
              ))}
            </Fragment>
          );
        })}
      </main>
    </DocumentationLayout>
  );
};

export const getStaticProps = async () => {
  const modules = await getModules();

  return {
    props: {
      modules,
    },
  };
};

export default Home;
