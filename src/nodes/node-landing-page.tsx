import dynamic from "next/dynamic";

export function NodeLandingPage({ node, ...props }) {
  return (
    <article {...props}>
      {node.field_paragraph_entity_content.map((paragraph) => {

        // if (paragraph.type === "paragraph--from_library") {
        //   paragraph = paragraph.field_reusable_paragraph.paragraphs
        // }

        const paragraph_type = paragraph.type.replace("paragraph--", "")
        // TODO: Replace with static import.
        const Paragraph = dynamic<{ paragraph: unknown }>(
          () => import(`../paragraphs/paragraph-${paragraph_type}.tsx`)
        )

        return paragraph ? (
          <Paragraph
            key={paragraph.id}
            paragraph={paragraph}
            data-cy={`paragraph-${paragraph_type}`}
          />
        ) : null
      })}
    </article>
  )
}
