import type IFilterGroup from "@/tools/interfaces/IFilterGroup";
import type IListFilterProps from "@/tools/interfaces/IListFilterProps";
import { Card, Col, Form, Row } from "react-bootstrap";

/**
 * List Page filter component. Will dynamically build a list of filters based on the
 * products that exist. Constructed using the site filter tag types in the database.
 * Displays all products that fix -any- of the checkboxes, and only those that match
 * the selected radio button groups.
 * @param IListFilterProps
 */
const ListFilter = ({
    products, 
    siteFilterTagTypes, 
    selectedFilters, 
    onChange}: IListFilterProps) => {

    //===========================================================================================================================
    /** Builds available options for each filter group (tag type) */
    const filterGroups: IFilterGroup[] = siteFilterTagTypes.map(siteType => {
        const tagTypeId = siteType.tagTypeId;
        const foundTags: {[tagId: number]: string} = {};
        products.forEach(product => {
            product.productTags?.forEach(pt => {
                if (pt.tag.tagType.id === tagTypeId) {
                    foundTags[pt.tag.id] = pt.tag.name;
                }
            })
        });

        const options = Object
            .entries(foundTags)
            .map(([id, name]) => ({
                id: Number(id),
                name
            }));

        return {
            id: tagTypeId,
            name: siteType.tagType.name,
            filterType: siteType.filterType,
            options
        }
    })

    //===========================================================================================================================
    /** Handles a checkbox filter change event. */
    const onCheckboxChange = (
        tagTypeId: number, 
        optionId: number) => {
        
        const prev = selectedFilters[tagTypeId] || [];
        let newVals: number[];
        if (prev.includes(optionId)) {
            newVals = prev.filter(id => id !== optionId);
        } else {
            newVals = [...prev, optionId];
        }
        onChange({...selectedFilters, [tagTypeId]: newVals});
    }

    //===========================================================================================================================
    /** Handles a radio button filter change event. */
    const onRadioChange = (tagTypeId: number, optionId: number) => {
        onChange({...selectedFilters, [tagTypeId]: [optionId]});
    }

    //===========================================================================================================================
    return (
        <Card
            className="shadow"
            style={{
                background: "linear-gradient(135deg, #212C3B 90%, #27334A 100%)",
                border: "1px solid #168aad",
                borderRadius: 16,
                boxShadow: "0 6px 24px 0 rgba(20,20,40,0.14)"
            }}
        >
            <Card.Body style={{padding: "1rem 1rem 0.25rem 1rem"}}>
                <h6 className="fw-bold mb-3" style={{
                    color: "#74D3EA",
                    letterSpacing: 2,
                    textShadow: "0 1px 8px rgba(116,211,234,0.21)"
                }}>
                    <i className="pi pi-filter me-1" style={{fontSize: "1.05em", verticalAlign: "middle", color: "#74D3EA"}} />
                    Filters
                </h6>
                {filterGroups.map((group) => (
                    <Card
                        key={group.id}
                        className="mb-3 border-0"
                        style={{
                            background: "rgba(32,42,58,0.96)",
                            borderRadius: 12,
                            boxShadow: "0 2px 8px 0 rgba(20,20,40,0.16)",
                            border: "1px solid #27496d"
                        }}
                    >
                        <Card.Body className="p-2">
                            <Row className="align-items-center mb-1">
                                <Col xs="auto">
                                    <i className="pi pi-sliders-h" style={{ fontSize: "0.95em", color: "#b1e6fc" }} />
                                </Col>
                                <Col className="small fw-semibold" style={{
                                    fontSize: "0.98em",
                                    color: "#FFF"
                                }}>
                                    {group.name}
                                </Col>
                            </Row>
                            <hr className="my-2" style={{ borderTop: "1px solid #395776", opacity: 0.37 }} />
                            <Form>
                                {group.options.length === 0 &&
                                    <span className="text-muted small">No options for this filter.</span>
                                }
                                {group.filterType === "checkbox" &&
                                    group.options.map(option => (
                                        <Form.Check
                                            key={option.id}
                                            type="switch"
                                            id={`filter-switch-${group.id}-${option.id}`}
                                            label={
                                                <span className="small" style={{ color: "#a2eafc" }}>
                                                    <i className="pi pi-check-circle text-info me-1" />
                                                    {option.name}
                                                </span>
                                            }
                                            checked={(selectedFilters[group.id] || []).includes(option.id)}
                                            onChange={() => onCheckboxChange(group.id, option.id)}
                                            className="mb-2"
                                            style={{
                                                fontSize: "0.96em",
                                                color: "#e1ecf7"
                                            }}
                                        />
                                    ))
                                }
                                {group.filterType === "radio" &&
                                    group.options.map(option => (
                                        <Form.Check
                                            key={option.id}
                                            type="radio"
                                            name={`filter-radio-group-${group.id}`}
                                            id={`filter-radio-${group.id}-${option.id}`}
                                            label={
                                                <span className="small" style={{ color: "#b6b4ff" }}>
                                                    <i className="pi pi-dot-circle text-primary me-1" />
                                                    {option.name}
                                                </span>
                                            }
                                            checked={(selectedFilters[group.id] || [])[0] === option.id}
                                            onChange={() => onRadioChange(group.id, option.id)}
                                            className="mb-2"
                                            style={{
                                                fontSize: "0.96em",
                                                color: "#dde1ef"
                                            }}
                                        />
                                    ))
                                }
                            </Form>
                        </Card.Body>
                    </Card>
                ))}
            </Card.Body>
        </Card>
    );
}

export default ListFilter;