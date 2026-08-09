# SPDX-FileCopyrightText: 2022 CERN.
# SPDX-License-Identifier: MIT

from marshmallow import Schema, fields

from invenio_administration.views.base import AdminResourceListView


class ActionPayloadSchema(Schema):
    """Test action payload schema."""

    start_date = fields.DateTime(required=True)


class ActionListView(AdminResourceListView):
    """Test list view with static and dynamic action defaults."""

    actions = {
        "dynamic": {
            "text": "Dynamic action",
            "payload_schema": ActionPayloadSchema,
            "initial_values": lambda: {"start_date": "2026-08-09T12:30:00Z"},
            "order": 1,
        },
        "static": {
            "text": "Static action",
            "payload_schema": ActionPayloadSchema,
            "initial_values": {"start_date": "2026-08-08T10:00:00Z"},
            "order": 2,
        },
    }


def test_serialize_action_initial_values():
    """Action initial values support mappings and request-time callables."""
    view = ActionListView.__new__(ActionListView)
    actions = view.serialize_actions()

    assert actions["dynamic"]["initial_values"] == {
        "start_date": "2026-08-09T12:30:00Z"
    }
    assert actions["static"]["initial_values"] == {"start_date": "2026-08-08T10:00:00Z"}
    assert actions["dynamic"]["payload_schema"]["start_date"]["type"] == "datetime"
